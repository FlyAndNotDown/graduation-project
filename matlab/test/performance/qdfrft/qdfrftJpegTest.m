source = im2double(imread('lena.bmp'));
secret = imread('secret4.bmp');

indexFile = fopen('dist/index.txt', 'w+');

r = dfrftKernel(8, 0.5);
ir = dfrftKernel(8, -0.5);

load('data/qdfrftModel.mat', 'model');

secretBers = zeros(1, 10);
x = zeros(1, 10);

fprintf(indexFile, 'testNo\t\tjpegPercent\t\tber\n');
for n = 1 : 10
    x(1, n) = 0.1 * n;
    [output, kp] = qdfrftMark(source, secret, 3, r, ir, 13);
    imwrite(output, ['dist/', num2str(n), '-output.bmp'], 'Quality', 100 * (1 - x(1, n)));
    output = imread(['dist/', num2str(n), '-output.bmp']);
    secretRestored = qdfrftRestore(output, model, kp, 3, r);
    secretBers(1, n) = ber(secret, secretRestored);

    imwrite(secretRestored, ['dist/', num2str(n), '-restored.bmp']);
    fprintf(indexFile, '%d\t\t\t%f\t\t\t\t%f\n', n, x(1, n), secretBers(1, n));
end

fclose(indexFile);
plot(x, secretBers);