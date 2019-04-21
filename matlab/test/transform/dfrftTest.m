source = 1:0.01:2;
source = source';
x = 1:1:length(source);

output = dfrft(source, 0.5);
restored = dfrft(output, -0.5);

figure(1);
subplot(1, 2, 1);
plot(x, real(output));
subplot(1, 2, 2);
plot(x, imag(output));