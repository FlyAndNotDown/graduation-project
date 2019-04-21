function output = dftEigenVectors(len)
%dftEigenVectors - get DFT eigen vector with GSA/OPA method
%
% - Arguments:
%       - len [int] length of vectors
%
% - Returns:
%       - output [nxn matrix] eigen vectors of DFT

% get matrix S
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

% get eigen vectors
[output, ~] = eig(s);

end