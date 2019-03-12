% load image
source = im2double(imread('lena.bmp'));
secret = imread('secret.bmp');

% calculate the kernel of DFRNT
p = rand(8, 8);
r = dfrntKernel(0.25, 1, p);
ir = dfrntKernel(-0.25, 1, p);

% watermarking
output1 = qdfrntMark(source, secret, 3, r, ir, 0.03);
output2 = qdfrntMark(source, secret, 3, r, ir, 0.05);
output3 = qdfrntMark(source, secret, 3, r, ir, 0.1);
output4 = qdfrntMark(source, secret, 3, r, ir, 0.2);
output5 = qdfrntMark(source, secret, 3, r, ir, 0.5);

% show result
figure();
subplot(3, 2, 1);
imshow(source);
subplot(3, 2, 2);
imshow(output1);
subplot(3, 2, 3);
imshow(output2);
subplot(3, 2, 4);
imshow(output3);
subplot(3, 2, 5);
imshow(output4);
subplot(3, 2, 6);
imshow(output5);