source = 0:0.05:1;

kernel = dfrftKernel(0.5, length(source));
iKernel = dfrftKernel(-0.5, length(source));

source = source';

output = dfrft(source, kernel);
restored = dfrft(output, iKernel);

figure(1);
subplot(2, 2, 1);
plot(source, real(output));
subplot(2, 2, 2);
plot(source, imag(output));