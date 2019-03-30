% load image
source = im2double(imread('peppers.tiff'));
secret = imread('secret2.bmp');

% calculate the kernel of DFRNT
p = rand(8, 8);
r = dfrntKernel(0.75, 1, p);
ir = dfrntKernel(-0.75, 1, p);

% watermarking
[output, kp] = qdfrntMark(source, secret, 3, r, ir, 0.05);

% calculate ssim
[ssimVal, ~] = ssim(source, output);

% restore
load('data/model.mat', 'model');
secretRestored = qdfrntRestore(output, model, kp, 3, r);

% show result
figure();
subplot(2, 2, 1);
imshow(source);
subplot(2, 2, 2);
imshow(secret);
subplot(2, 2, 3);
imshow(output);
subplot(2, 2, 4);
imshow(secretRestored);