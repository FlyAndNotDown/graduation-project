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
p = rand(imgRows, imgRows);
kernel = dfrntKernel(0.25, 1, p);
iKernel = dfrntKernel(-0.25, 1, p);

% set a pure unit quaternion
u = [0, 1, 0, 0];

% show source image
figure(1);
subplot(2, 2, 1);
imshow(img);

% show image after one time QDFRNT
subplot(2, 2, 2);
output = lqdfrnt2(source, 512, kernel, u);
imshow(output(:, :, [2, 3, 4]));

% show image restored from output image
subplot(2, 2, 3);
reSource = lqdfrnt2(output, 512, iKernel, u);
imshow(reSource(:, :, [2, 3, 4]));

% show image after four time QDFRNT
subplot(2, 2, 4);
output4 = lqdfrnt2(output, 512, kernel, u);
output4 = lqdfrnt2(output4, 512, kernel, u);
output4 = lqdfrnt2(output4, 512, kernel, u);
imshow(output4(:, :, [2, 3, 4]));