source = zeros(11, 1, 4);
source(:, :, 1) = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]';
source(:, :, 2) = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]';
source(:, :, 3) = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]';
source(:, :, 4) = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]';

u = [0, 1, 0, 0];

kernel = dfrftKernel(11, 0.5);
iKernel = dfrftKernel(11, -0.5);

output = lqdfrft(source, kernel, u);
restored = lqdfrft(output, iKernel, u);