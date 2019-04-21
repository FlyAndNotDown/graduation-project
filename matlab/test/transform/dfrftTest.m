source = zeros(1, 31);
for n = 1 : length(source)
    if rem(n, 2) == 0
        source(1, n) = 1;
    end
end
x = 1:1:length(source);

source = source';

output = dfrft(source, 0.5);
restored = dfrft(output, -0.5);

figure(1);
subplot(1, 2, 1);
plot(x, real(output));
subplot(1, 2, 2);
plot(x, imag(output));