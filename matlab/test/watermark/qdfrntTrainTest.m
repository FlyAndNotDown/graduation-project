% load image
source = im2double(imread('lena.bmp'));

% init secret sequence
secret = rand(1, 200);

% calculate the kernel of DFRNT
p = rand(8, 8);
r = dfrntKernel(0.75, 1, p);

% start train
model = qdfrntTrain(source, secret, r, 0.05);
save('data/model.dat', 'model');