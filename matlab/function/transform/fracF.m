%FAST COMPUTATION OF THE FRACTIONAL FOURIER TRANSFORM 
%by M. Alper Kutay, September 1996, Ankara
%Copyright 1996 M. Alper Kutay
%This code may be used for scientific and educational purposes
%provided credit is given to the publications below:
%
%Haldun M. Ozaktas, Orhan Arikan, M. Alper Kutay, and Gozde Bozdagi,
%Digital computation of the fractional Fourier transform,
%IEEE Transactions on Signal Processing, 44:2141--2150, 1996. 
%Haldun M. Ozaktas, Zeev Zalevsky, and M. Alper Kutay,
%The Fractional Fourier Transform with Applications in Optics and
%Signal Processing, Wiley, 2000, chapter 6, page 298.
%
%The several functions given below should be separately saved
%under the same directory. fracF(fc,a) is the function the user
%should call, where fc is the sample vector of the function whose
%fractional Fourier transform is to be taken, and `a' is the
%transform order. The function returns the samples of the a'th
%order fractional Fourier transform, under the assumption that
%the Wigner distribution of the function is negligible outside a
%circle whose diameter is the square root of the length of fc.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function[res]=fracF(fc,a);

% This function operates on the vector fc which is assumed to
% be the samples of a function, obtained at a rate 1/deltax 
% where the Wigner distribution of the function f is confined
% to a circle of diameter deltax around the origin. 
% (deltax^2 is the time-bandwidth product of the function f.)
% fc is assumed to have an even number of elements.
% This function maps fc to a vector, whose elements are the samples 
% of the a'th order fractional Fourier transform of the function f. 
% The lengths of the input and ouput vectors are the same if the 
% input vector has an even number of elements, as required.
% Operating interval: -2 <= a <= 2
% This function uses the `core' function corefrmod2.m

N = length(fc);
if fix(N/2) ~= N/2
  error('Length of the input vector should be even');
end;

fc = fc(:);

fc = bizinter(fc);
fc = [zeros(N,1); fc ; zeros(N,1)];

flag	= 0;

if (a>0) & (a<0.5)
   flag	= 1;
   a	= a-1;
end;
if (a>-0.5) & (a<0)
  flag	= 2;
  a	= a+1;
end;

if (a>1.5) & (a<2)
   flag	= 3;
   a	= a-1;
end;

if (a>-2) & (a<-1.5)
   flag	= 4;
   a	= a+1;
end;

res = fc;

if (flag==1) | (flag==3)
  res 	= corefrmod2(fc,1);
end;

if (flag==2) | (flag==4)
  res 	= corefrmod2(fc,-1);
end;

if (a==0)
  res	= fc;
else
if (a==2) | (a==-2)
  res	= flipud(fc);
else
  res	= corefrmod2(res,a);
end;
end;


res = res(N+1:3*N);
res = bizdec(res);
res(1) = 2*res(1);

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function[res]=corefrmod2(fc,a);

% Core function for computing the fractional Fourier transform.
% Valid only when 0.5 <= abs(a) <= 1.5
% Decomposition used: 
%   chirp mutiplication - chirp convolution - chirp mutiplication

deltax	= sqrt(length(fc));

phi	= a*pi/2;
N	= fix(length(fc));
deltax1 = deltax;
alpha	= 1/tan(phi);
beta	= 1/sin(phi);

x	= [-ceil(N/2):fix(N/2)-1]/deltax1;
fc	= fc(:);
fc	= fc(1:N);
f1	= exp(-i*pi*tan(phi/2)*x.*x); %multiplication by chirp!
f1	= f1(:);
fc      = fc.*f1;
x	= x(:);
clear x;
t	=[-N+1:N-1]/deltax1;
hlptc	=exp(i*pi*beta*t.*t);
clear t;
hlptc	= hlptc(:);

N2	= length(hlptc);
N3	= 2^(ceil(log(N2+N-1)/log(2)));
hlptcz	= [hlptc;zeros(N3-N2,1)];
fcz	= [fc;zeros(N3-N,1)];
Hcfft	= ifft(fft(fcz).*fft(hlptcz));  % convolution with chirp
clear hlptcz;
clear fcz;
Hc	= Hcfft(N:2*N-1);
clear Hcfft;
clear hlptc;


Aphi	= exp(-i*(pi*sign(sin(phi))/4-phi/2))/sqrt(abs(sin(phi)));
xx	= [-ceil(N/2):fix(N/2)-1]/deltax1;
f1	= f1(:);        
res	= (Aphi*f1.*Hc)/deltax1;  % multiplication by chirp!

if (fix(N/2) ~=N/2)
  res2(1:N-1) = res(2:N);
  res2(N)     = res(1);
  res     = res2;
end;

res = res(:);

clear f1
clear Hc

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function xint=bizinter(x)

N=length(x);
im = 0;
if sum(abs(imag(x)))>0
  im = 1;
  imx = imag(x);
  x  = real(x);
end;

x2=x(:);
x2=[x2.'; zeros(1,N)];
x2=x2(:);
xf=fft(x2);
if rem(N,2)==1      %N = odd
	N1=fix(N/2+1); N2=2*N-fix(N/2)+1;
	xint=2*real(ifft([xf(1:N1); zeros(N,1)  ;xf(N2:2*N)].'));
else
	xint=2*real(ifft([xf(1:N/2); zeros(N,1)  ;xf(2*N-N/2+1:2*N)].'));
end;
if ( im == 1)
 x2=imx(:);
 x2=[x2.'; zeros(1,N)];
 x2=x2(:);
 xf=fft(x2);
 if rem(N,2)==1      %N = odd
	N1=fix(N/2+1); N2=2*N-fix(N/2)+1;
	xmint=2*real(ifft([xf(1:N1); zeros(N,1)  ;xf(N2:2*N)].'));
 else
	xmint=2*real(ifft([xf(1:N/2); zeros(N,1)  ;xf(2*N-N/2+1:2*N)].'));
 end;
 xint = xint + i*xmint;
end;

xint = xint(:);

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function xdec=bizdec(x)

k = 1:2:length(x);
xdec = x(k);

xdec = xdec(:);

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function F2D=fracF2D(f2D,ac,ar)

[M,N] = size(f2D);
F2D = zeros(M,N);

if ac == 0
   F2D = f2D;
else
   for k = 1:N
     F2D(:,k) = fracF(f2D(:,k),ac);
   end;
end;


F2D = conj(F2D');

if ar ~= 0
	for k = 1:M
   	F2D(:,k) = fracF(F2D(:,k),ar);
	end;
end;

F2D = conj(F2D');
