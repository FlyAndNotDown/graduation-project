% load image
source = im2double(imread('lena.bmp'));

% init secret sequence
secret = floor(rand(1, 2000) + 0.5);

% calculate the kernel of DFRNT
p = rand(8, 8);
r = dfrntKernel(0.75, 1, p);

% start train
model = qdfrntTrain(source, secret, r, 15);
save('data/qdfrntModel.mat', 'model');