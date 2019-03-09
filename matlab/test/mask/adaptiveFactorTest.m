% read image
source = im2double(imread('lena.bmp'));

% split block
blocks = splitBlock(source, 32);

% get adaptive factor
factors = adaptiveFactor(blocks, 1);