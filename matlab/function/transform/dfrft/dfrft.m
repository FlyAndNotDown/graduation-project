function Fa=dfrft(f,a)

% Compute discrete fractional Fourier transform
% of order a of vector f according to Pei/Yeh/Tseng

N=length(f); f=f(:);
shft = rem((0:N-1)+fix(N/2),N)+1;

global hn_saved p_saved
if (nargin==2), p = 2; end;
p = min(max(2,p),N-1);

if (length(hn_saved) ~= N | p_saved ~= p),
    hn = make_hn(N,p);
    hn_saved = hn; p_saved = p;
else
    hn = hn_saved;
end;
Fa(shft,1)=hn*(exp(-j*pi/2*a*[0:N-1]).'.*(hn'*f(shft)));

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function hn = make_hn(N,p)
even = rem(N,2)==0;
shft = rem((0:N-1)+fix(N/2),N)+1;
% Gauss-Hermite samples
u = (-N/2:(N/2)-1)'/sqrt(N/2/pi);
ex = exp(-u.^2/2); 
hn(:,1) = ex; r = norm(hn(:,1)); hn(:,1) = hn(:,1)/r;
hn(:,2)=2*u.*ex; s = norm(hn(:,2)); hn(:,2) = hn(:,2)/s;
r = s/r;
for k = 3:N+1
     hn(:,k)=2*r*u.*hn(:,k-1)-2*(k-2)*hn(:,k-2);
     s = norm(hn(:,k)); hn(:,k) = hn(:,k)/s;
     r=s/r;
end
if (even), hn(:,N)=[]; else, hn(:,N+1)=[]; end
hn(shft,:) = hn;

% eigenvectors of DFT matrix
E = make_E(N,N/2);

for k = 1:4
 if even % N even
  switch k
   case {1,3}
    indx = k:4:N+1;
    if (rem(N,4) ~= 0 && k==3) || (rem(N,4) == 0 && k==1),
        indx(end) = indx(end)-1;
    end
   case {2,4}
    indx = k:4:N-1;
   end
 else % N odd
   indx = k:4:N;
 end
 OH=orth(E(:,indx)*E(:,indx)'*hn(:,indx));
 ds=length(k:4:N)-size(OH,2);
 OH=[OH zeros(size(hn,1),ds)];
 hn(:,k:4:N) = OH;
end

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function E = make_E(N,p)
%Returns sorted eigenvectors and eigenvalues of corresponding vectors

%Construct matrix H, use approx order ord

diagSource = zeros(1, N);
for n = 1 : N
  diagSource(1, n) = 2 * cos((n - 1) * 2 * pi / N);
end
matrixS = diag(diagSource) + diag(ones(1, N - 1), 1) + diag(ones(1, N - 1), -1);
matrixS(1, N) = 1;
matrixS(N, 1) = 1;

[E, ~] = eig(matrixS);
E = fliplr(E);


% d2 = [1 -2 1]; d_p = 1; s = 0; st = zeros(1,N);
% for k = 1:p/2,
%     d_p = conv(d2,d_p);
%     st([N-k+1:N,1:k+1]) = d_p; st(1) = 0;
%     %s = s + (-1)^(k-1)*prod(1:(k-1))^2/prod(1:2*k)*2*st; 
%     ppp = prod(k:2*k)*2;
%     % if (ppp == Inf ) break, end
%     s = s + (-1)^(k-1)/ppp*st;
% end;
% % H = circulant + diagonal
% col = (0:N-1)'; row = (N:-1:1);
% idx = col(:,ones(N,1)) + row(ones(N,1),:);
% st = [s(N:-1:2).';s(:)];
% H = st(idx)+diag(real(fft(s)));

% %Construct transformation matrix V

% r = floor(N/2);
% even = ~rem(N,2);
% V1 = (eye(N-1)+flipud(eye(N-1)))/sqrt(2);
% V1(N-r:end,N-r:end) = -V1(N-r:end,N-r:end);
% if (even) V1(r,r)=1; end
% V = eye(N); V(2:N,2:N) = V1;

% % Compute eigenvectors

% VHV = V*H*V';
% E = zeros(N);
% Ev = VHV(1:r+1,1:r+1);           Od = VHV(r+2:N,r+2:N);
% [ve,ee]=eig(Ev);                 [vo,eo]=eig(Od); 
% %malab eig returns sorted eigenvalues
% %if different routine gives unsorted eigvals, then sort first
% %[d,inde] = sort(diag(ee));      [d,indo] = sort(diag(eo));
% %ve = ve(:,inde');               vo = vo(:,indo');
% E(1:r+1,1:r+1) = fliplr(ve);     E(r+2:N,r+2:N) = fliplr(vo);
% E = V*E;
% % shuffle eigenvectors
% ind = [1:r+1;r+2:2*r+2]; ind = ind(:);
% if (even) ind([N,N+2])=[]; else ind(N+1)=[]; end
% E = E(:,ind');