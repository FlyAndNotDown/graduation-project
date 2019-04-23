% read lena image
source = rgb2gray(im2double(imread('lena.bmp')));

% get size info
[sourceRows, sourceCols] = size(source);

% get two random matrix
p = rand(sourceCols, sourceCols);

% calculate kernel matrix of DFRNT
kernel = dfrntKernel(0.25, 1, p);
iKernel = dfrntKernel(-0.25, 1, p);

% show the source image
figure(1);
subplot(2, 2, 1);
imshow(source);

% show the image after one time DFRNT
subplot(2, 2, 2);
output = dfrnt2(source, 512, kernel);
imshow(output);

% show the image restored from output image
subplot(2, 2, 3);
reSource = dfrnt2(output, 512, iKernel);
imshow(reSource);

% show the image after four time DFRNT
subplot(2, 2, 4);
output4 = dfrnt2(output, 512, kernel);
output4 = dfrnt2(output4, 512, kernel);
output4 = dfrnt2(output4, 512, kernel);
imshow(output4);