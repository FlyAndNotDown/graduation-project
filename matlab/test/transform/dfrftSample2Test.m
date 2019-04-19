source = rgb2gray(im2double(imread('lena.bmp')));
output = dfrftSample2(source, 512, 0.5);
restored = dfrftSample2(output, 512, -0.5);

figure(1);
subplot(2, 2, 1);
imshow(source);
subplot(2, 2, 2);
imshow(output);
subplot(2, 2, 3);
imshow(restored);