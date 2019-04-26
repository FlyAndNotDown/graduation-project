% load image
source = im2double(imread('lena.bmp'));
secret = imread('secret.bmp');

% calculate the kernel DFrFT
kernel = dfrftKernel(8, 0.5);
iKernel = dfrftKernel(8, -0.5);

% % laod ga keys
% load('data/qdfrftGaKeys.mat', 'gaKeys');

% watermarking
[output, kp, kl] = qdfrftQcMark(source, secret, 3, kernel, iKernel, 0.9376303840996769);

% ssim
[ssimVal, ~] = ssim(source, output);

% restore
secretRestored = qdfrftQcRestore(output, kp, kl, 3, kernel);
secretBer = ber(secret, secretRestored);

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