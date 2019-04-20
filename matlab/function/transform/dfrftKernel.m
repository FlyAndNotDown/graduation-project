function output = dfrftKernel(a, len)

even = ~rem(len, 2);

dftEigens = getDftEigens(len);

matrixU = zeros(len, len);
for n1 = 1 : len
    u = hermiteSample(n1 - 1, len);
    temp = zeros(len, 1);
    for n2 = 1 : len
        if (mod(n1 - n2, 4) == 0)
            v = dftEigens(:, n2);
            temp = temp + u * dot(u, v) / (norm(u) * norm(v));
        end
    end
    matrixU(:, n1) = temp;
end
if even
    u = hermiteSample(len, len);
    temp = zeros(len, 1);
    for n2 = 1 : len
        if (mod(len - n2, 4) == 0)
            v = dftEigens(:, n2);
            temp = temp + u * dot(u, v) / (norm(u) * norm(v));
        end
    end
    matrixU(:, len) = temp;
end
matrixU = orth(matrixU);

matrixD = zeros(len, len);
for n = 1 : len
    matrixD(n, n) = exp(-1i * a * (n - 1));
end
if even
    matrixD(n, n) = exp(-1i * a * (len));
end

output = matrixU * matrixD * matrixU';

end



function output = hermiteSample(nth, len)

even = ~rem(len, 2);
t = sqrt(2 * pi / len);
output = zeros(len, 1);
publicFactor = 1 / sqrt(2 ^ nth * factorial(nth) * sqrt(len / 2) * t);
xSymbol = sym('x');
her = hermiteH(nth, xSymbol);
for n = 1 : len
    k = n - (floor(len / 2) + 1);
    x = k / sqrt(len / (2 * pi));
    output(n, 1) = publicFactor * eval(her) * exp(0 - k * k * pi / len);
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



function output = getDftEigens(len)

s = zeros(len, len);
s(1, len) = 1;
s(len, 1) = 1;
w = 2 * pi / len;
for n = 1 : len
    s(n, n) = 2 * cos((n - 1) * w);
end
for n = 1 : len - 1
    s(n, n + 1) = 1;
    s(n + 1, n) = 1;
end

[output, ~] = eig(s);

end