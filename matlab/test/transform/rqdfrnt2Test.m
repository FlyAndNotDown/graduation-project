% load image with color
img = im2double(imread('lena.bmp'));

% get size info
[imgRows, imgCols, imgHeight] = size(img);

% add a new channel to image
source = zeros(imgRows, imgCols, imgHeight + 1);
for n = 2 : 4
    source(:, :, n) = img(:, :, n - 1);
end

% calculate the kernel matrix
pr = rand(imgCols, imgCols);
pc = rand(imgRows, imgRows);
rr = dfrntKernel(0.25, 1, pr);
rri = dfrntKernel(-0.25, 1, pr);
rc = dfrntKernel(0.25, 1, pc);
rci = dfrntKernel(-0.25, 1, pc);

% set a pure unit quaternion
u = [0, 1, 0, 0];

% show source image
figure(1);
subplot(2, 2, 1);
imshow(img);

% show image after one time QDFRNT
subplot(2, 2, 2);
output = rqdfrnt2(source, rr, rc, u);
imshow(output(:, :, [2, 3, 4]));

% show image restored from output image
subplot(2, 2, 3);
reSource = rqdfrnt2(output, rri, rci, u);
imshow(reSource(:, :, [2, 3, 4]));

% show image after four time QDFRNT
subplot(2, 2, 4);
output4 = rqdfrnt2(output, rr, rc, u);
output4 = rqdfrnt2(output4, rr, rc, u);
output4 = rqdfrnt2(output4, rr, rc, u);
imshow(output4(:, :, [2, 3, 4]));