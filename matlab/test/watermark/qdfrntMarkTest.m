% load image
source = im2double(imread('lena.bmp'));
secret = imread('secret.bmp');

% calculate the kernel of DFRNT
p = rand(8, 8);
r = dfrntKernel(0.25, 1, p);
ir = dfrntKernel(-0.25, 1, p);

% watermarking
output1 = qdfrntMark(source, secret, 3, r, ir, 0.2);
output2 = qdfrntMark(source, secret, 3, r, ir, 0.5);
output3 = qdfrntMark(source, secret, 3, r, ir, 1);

% show result
figure();
subplot(2, 2, 1);
imshow(source);
subplot(2, 2, 2);
imshow(output1);
subplot(2, 2, 3);
imshow(output2);
subplot(2, 2, 4);
imshow(output3);