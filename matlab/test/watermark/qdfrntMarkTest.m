% load image
source = im2double(imread('lena.bmp'));
secret = imread('secret.bmp');

% calculate the kernel of DFRNT
p = rand(8, 8);
r = dfrntKernel(0.25, 1, p);
ir = dfrntKernel(-0.25, 1, p);

% watermarking
output = dfrntMark(source, secret, 3, r, ir);