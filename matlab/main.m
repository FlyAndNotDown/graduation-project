lena = rgb2gray(double(imread('lena.bmp')));

r = dfrntKernal(0.25, 1, rand(512, 512));

result = dfrnt2(lena, r);

figure, imshow(result);