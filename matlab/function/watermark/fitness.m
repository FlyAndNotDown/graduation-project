function output = fitness(intensityFactor)
%fitness - GA fitness function

% bers = [0.0547, 0.1057, 0.0615, 0.0291, 0.1431, 0.0896, 0.0168, 0.0603, 0.0867, 0];

source = im2double(imread('lena.bmp'));
secret = im2double(imread('secret.bmp'));

kernel = dfrftKernel(8, 0.5);
iKernel = dfrftKernel(8, -0.5);

[sourceMarked, kp, kl] = qdfrftQcMark(source, secret, 3, kernel, iKernel, intensityFactor);
secretRestored = qdfrftQcRestore(sourceMarked, kp, kl, 3, kernel);
[ssimVal, ~] = ssim(source, sourceMarked);
secretBers = ber(secret, secretRestored);

% attack
berSum = 0;
berSum = berSum + secretBers;
% % gaussian noise
% noiseMarked = imnoise(sourceMarked, 'gaussian', 0, 0.01);
% noiseRestored = qdfrftQcRestore(noiseMarked, kp, kl, 3, kernel);
% berSum = berSum + ber(secret, noiseRestored);

% output = 50 * abs(ssimVal - 1) + berSum;
% output = 5 * abs(ssimVal - 1) + berSum;
output = berSum;

end