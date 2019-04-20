function output = dfrftKernel(len)

sample = hermiteSample(3, 5);

end

function output = hermiteSample(nth, len)

even = ~rem(len, 2);
t = sqrt(2 * pi / len);
output = zeros(len, 1);
publicFactor = 1 / sqrt(2 ^ nth * factorial(nth) * sqrt(len / 2) * t);
for n = 1 : len
    k = n - (floor(len / 2) + 1);
    output(n, 1) = publicFactor * hermiteH(nth, k / sqrt(len / (2 * pi))) * exp(0 - k * k * pi / len);
end

if even
    front = output(1 : floor(len / 2), 1);
    back = output(floor(len / 2) + 1 : len, 1);
    output(1 : floor(len / 2), 1) = back;
    output(floor(len / 2) + 1 : len, 1) = front;
else
    front = output(1 : floor(len / 2), 1);
    back =  output(floor(len / 2) + 1 : len, 1);
    output(1 : floor(len / 2) + 1, 1) = back;
    output(floor(len / 2) + 2 : len, 1) = front;
end

vectorMod = norm(output);
output = output / vectorMod;

end