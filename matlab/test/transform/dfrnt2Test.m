% read lena image
source = rgb2gray(im2double(imread('lena.bmp')));

% get size info
[sourceRows, sourceCols] = size(source);

% get two random matrix
pr = rand(sourceCols, sourceCols);
pc = rand(sourceRows, sourceRows);

% calculate kernel matrix of DFRNT
rr = dfrntKernel(0.25, 1, pr);
rri = dfrntKernel(-0.25, 1, pr);
rc = dfrntKernel(0.25, 1, pc);
rci = dfrntKernel(-0.25, 1, pc);

% show the source image
figure(1);
subplot(2, 2, 1);
imshow(source);

% show the image after one time DFRNT
subplot(2, 2, 2);
output = dfrnt2(source, 512, 512, rr, rc);
imshow(output);

% show the image restored from output image
subplot(2, 2, 3);
reSource = dfrnt2(output, 512, 512, rri, rci);
imshow(reSource);

% show the image after four time DFRNT
subplot(2, 2, 4);
output4 = dfrnt2(output, 512, 512, rr, rc);
output4 = dfrnt2(output4, 512, 512, rr, rc);
output4 = dfrnt2(output4, 512, 512, rr, rc);
imshow(output4);