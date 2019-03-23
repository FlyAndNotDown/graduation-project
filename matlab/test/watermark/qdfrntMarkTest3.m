% load image
source = im2double(imread('lena.bmp'));
secret = imread('secret.bmp');

% calculate the kernel of DFRNT
p = rand(8, 8);
r = dfrntKernel(0.75, 1, p);
ir = dfrntKernel(-0.75, 1, p);

% watermarking
output = qdfrntMark(source, secret, 3, r, ir, 0.005);

% show result
figure();
subplot(1, 2, 1);
imshow(source);
subplot(1, 2, 2);
imshow(output);