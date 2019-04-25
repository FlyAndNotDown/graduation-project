% read image
source = im2double(imread('lena.bmp'));

% get adaptive factor
factors = adaptiveFactor(source, 1);