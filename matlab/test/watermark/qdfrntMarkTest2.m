% load image
source = im2double(imread('peppers.tiff'));
secret = imread('secret2.bmp');

% calculate the kernel of DFRNT
p1 = rand(8, 8);
p2 = rand(8, 8);
p3 = rand(8, 8);
r1 = dfrntKernel(0.25, 1, p1);
ir1 = dfrntKernel(-0.25, 1, p1);
r2 = dfrntKernel(0.25, 2, p2);
ir2 = dfrntKernel(-0.25, 2, p2);
r3 = dfrntKernel(0.75, 1, p3);
ir3 = dfrntKernel(-0.75, 1, p3);

% watermarking
output1 = qdfrntMark(source, secret, 3, r1, ir1, 0.005);
output2 = qdfrntMark(source, secret, 3, r1, ir1, 0.02);
output3 = qdfrntMark(source, secret, 3, r2, ir2, 0.005);
output4 = qdfrntMark(source, secret, 3, r2, ir2, 0.02);
output5 = qdfrntMark(source, secret, 3, r3, ir3, 0.005);
output6 = qdfrntMark(source, secret, 3, r3, ir3, 0.02);
output7 = qdfrntMark(source, secret, 3, r3, ir3, 0.05);

% show result
figure();
subplot(2, 4, 1);
imshow(source);
subplot(2, 4, 2);
imshow(output1);
subplot(2, 4, 3);
imshow(output2);
subplot(2, 4, 4);
imshow(output3);
subplot(2, 4, 5);
imshow(output4);
subplot(2, 4, 6);
imshow(output5);
subplot(2, 4, 7);
imshow(output6);
subplot(2, 4, 8);
imshow(output7);