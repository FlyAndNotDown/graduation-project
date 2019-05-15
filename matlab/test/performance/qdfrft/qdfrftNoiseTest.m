% load image
source = im2double(imread('lena.bmp'));
secret = imread('secret.bmp');

% file
indexFile = fopen('dist/index.txt', 'w+');

% calculate the kernel of DFrFT
r = dfrftKernel(8, 0.5);
ir = dfrftKernel(8, -0.5);

% load SVM model
load('data/qdfrftModel.mat', 'model');

% init ssim & ber values
ssimValues = zeros(1, 20);
secretBers = zeros(1, 20);
x = zeros(1, 20);

fprintf(indexFile, 'testNo\t\tgaussianNoiseVariancet\t\tber\n');
for n = 1 : 20
    % x location
    x(1, n) = 0.001 * n;

    % watermarking
    [output, kp] = qdfrftMark(source, secret, 3, r, ir, 13);

    % calculate ssim
    [sourceSsimVal, ~] = ssim(source, output);
    ssimValues(1, n) = sourceSsimVal;

    % add some noise
    output = imnoise(output, 'gaussian', 0, x(1, n));

    % restore
    secretRestored = qdfrftRestore(output, model, kp, 3, r);
    secretBers(1, n) = ber(secret, secretRestored);

    % log
    imwrite(output, ['dist/', num2str(n), '-output.bmp']);
    imwrite(secretRestored, ['dist/', num2str(n), '-restored.bmp']);
    fprintf(indexFile, '%d\t\t\t%f\t\t\t\t%f\n', n, x(1, n), secretBers(1, n));
end

% close file
fclose(indexFile);

% show result
plot(x, secretBers);