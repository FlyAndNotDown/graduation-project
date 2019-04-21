function output = hermiteSample(nth, len)
%hermiteSample - get hermite sample sequence
%
% - Arguments:
%       - nth [int] order of hermiteH
%
% - Returns:
%       - output [nxn matrix] hermite sample sequences

% judge even status
even = ~rem(len, 2);

% get sequence
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

% shifting
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

% normalize
vectorMod = norm(output);
output = output / vectorMod;

end