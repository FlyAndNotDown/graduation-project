function y = dfrftSample(f,N,a,p)
%
% Computes discrete fractional Fourier transform
% of order a of vector x
% p (optional) is order of approximation, default N/2
%
%

% N = length(f);
even = ~rem(N,2);
shft = rem((0:N-1) + fix(N/2),N)+1;
f = f(:);
if (nargin == 3), p = N/2; end;
p = min(max(2,p),N-1);
E = dFRFT(N,p);
y(shft,1) = E*(exp(-j*pi/2*a*([0:N-2 N-1+even])).' .*(E'*f(shft)));

function E = dFRFT(N,p)
%
% function E = dFRFT(N,a,p) returns the NxN eigenvectors of the 
% Fourier transform matrix
% The optional argument p is the order of approximation

global E_saved p_saved

if (length(E_saved) ~= N | p_saved ~= p),
    E = make_E(N,p);
    E_saved = E; p_saved = p;
else
    E = E_saved; 
end;

function E = make_E(N,p)

% Returns sorted eigenvectors and eigenvalues of corresponding vectors

% Construct matrix H, use approx order ord

d2 = [1 -2 1]; d_p = 1; s = 0; st = zeros(1,N);
for k = 1:p/2,
    d_p = conv(d2,d_p);
    st([N-k+1:N,1:k+1]) = d_p; st(1) = 0;
    temp = [1,1:k-1;1,1:k-1]; temp = temp(:)'./[1:2*k];
    s = s + (-1)^(k-1)*prod(temp)*2*st;        
end;

% H = circulant + diagonal

col = (0:N-1)'; row = (N:-1:1);
idx = col(:,ones(N,1)) + row(ones(N,1),:);
st = [s(N:-1:2).';s(:)];
H = st(idx) + diag(real(fft(s)));

% Construct transformation matrix V

r = floor(N/2);
even = ~rem(N,2);
V1 = (eye(N-1) + flipud(eye(N-1))) / sqrt(2);
V1(N-r:end,N-r:end) = -V1(N-r:end,N-r:end);
if (even), V1(r,r) = 1; end
V = eye(N); V(2:N,2:N) = V1;

% Compute eigenvectors

VHV = V*H*V';
E = zeros(N);
Ev = VHV(1:r+1,1:r+1);           Od = VHV(r+2:N,r+2:N);
[ve,ee] = eig(Ev);               [vo,eo] = eig(Od); 

%
% malab eig returns sorted eigenvalues
% if different routine gives unsorted eigvals, then sort first
%
% [d,inde] = sort(diag(ee));      [d,indo] = sort(diag(eo));
% ve = ve(:,inde');               vo = vo(:,indo');
%

E(1:r+1,1:r+1) = fliplr(ve);     E(r+2:N,r+2:N) = fliplr(vo);
E = V*E;

% shuffle eigenvectors

ind = [1:r+1;r+2:2*r+2]; ind = ind(:);
if (even), ind([N,N+2]) = []; else ind(N+1) = []; end
E = E(:,ind');