function output = dfrftKernel(a, len)
%dfrftKernel - get kernel matrix of DFrFT with GSA/OPA method
%
% - Arguments:
%       - a [double] fractional order of transform
%       - len [int] length of matrix
%
% - Returns:
%       - output [nxn matrix] kernel matrix of DFrFT

% judge if it is even number
even = ~rem(len, 2);

% get DFT eigen vectors
dftEigens = dftEigenVectors(len);

% calculate matrix U
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

% calculate matrix D
matrixD = zeros(len, len);
for n = 1 : len
    matrixD(n, n) = exp(-1i * a * (n - 1));
end
if even
    matrixD(n, n) = exp(-1i * a * (len));
end

% get kernel matrix
output = matrixU * matrixD * matrixU';

end
