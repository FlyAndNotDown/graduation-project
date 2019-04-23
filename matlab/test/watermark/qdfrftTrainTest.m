% load image
source = im2double(imread('lena.bmp'));

% init secret sequence
secret = floor(rand(1, 2000) + 0.5);

% calculate the kernel of DFrFT
kernel = dfrftKernel(8, 0.5);

% start train
model = qdfrftTrain(source, secret, kernel, 15);
save('data/qdfrftModel.mat', 'model');