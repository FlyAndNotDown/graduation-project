source = zeros(1, 31);
for n = 1 : length(source)
    if rem(n, 2) == 0
        source(1, n) = 1;
    end
end
x = 1:1:length(source);

kernel = dfrftKernel(0.5, length(source));
iKernel = dfrftKernel(-0.5, length(source));

source = source';

output = dfrft(source, kernel);
restored = dfrft(output, iKernel);

output2 = DFpei(source, 0.5);
restored2 = DFpei(output2, -0.5);

figure(1);
subplot(2, 2, 1);
plot(x, real(output));
subplot(2, 2, 2);
plot(x, imag(output));
subplot(2, 2, 3);
plot(x, real(output2));
subplot(2, 2, 4);
plot(x, imag(output2));