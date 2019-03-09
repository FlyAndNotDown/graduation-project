source = rgb2gray(im2double(imread('lena.bmp')));

[sourceRows, sourceCols] = size(source);

pr = rand(sourceCols, sourceCols);
pc = rand(sourceRows, sourceRows);

rr = dfrntKernel(0.25, 1, pr);
rri = dfrntKernel(-0.25, 1, pr);
rc = dfrntKernel(0.25, 1, pc);
rci = dfrntKernel(-0.25, 1, pc);

figure(1);
subplot(2, 2, 1);
imshow(source);

subplot(2, 2, 2);
output = dfrnt2(source, rr, rc);
imshow(output);

subplot(2, 2, 3);
reSource = dfrnt2(output, rri, rci);
imshow(reSource);

subplot(2, 2, 4);
output4 = dfrnt2(output, rr, rc);
output4 = dfrnt2(output4, rr, rc);
output4 = dfrnt2(output4, rr, rc);
imshow(output4);