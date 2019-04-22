source = zeros(1, 201);
for n = 94 : 106
    source(1, n) = 1;
end
source = source';
x = 1:1:length(source);

kernel = dfrftKernel(length(source), 0.5);
iKernel = dfrftKernel(length(source), -0.5);

output = dfrft(source, kernel);
restored = dfrft(output, iKernel);

figure(1);
subplot(1, 2, 1);
plot(x, real(output));
subplot(1, 2, 2);
plot(x, imag(output));