function output = lqdfrft2(source, len, tKernel, u)
%lqdfrft2 - two-dimension LQDFrFT
%
% - Arguments:
%       - source [nxnx4 double matrix] nxnx4 source quaternion signal matrix
%       - tKernel [nxnx4 double matrix] kernel of transform
%       - ur[1x4 vector] a unit pure quaternion vector

output = source;

for n = 1 : len
    output(n, :, :) = permute(lqdfrft(permute(output(n, :, :), [2, 1, 3]), len, tKernel, u), [2, 1, 3]);
end

for n = 1 : len
    output(:, n, :) = lqdfrft(output(:, n, :), len, tKernel, u);
end

end