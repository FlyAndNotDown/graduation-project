function output = lqdfrft2(source, kernel, u)
%lqdfrft2 - two-dimension LQDFrFT
%
% - Arguments:
%       - source [nxnx4 double matrix] nxnx4 source quaternion signal matrix
%       - kernel [nxnx4 double matrix] fractional order of transform
%       - ur[1x4 vector] a unit pure quaternion vector

[sRows, sCols, ~] = size(source);
output = source;

for n = 1 : sRows
    output(n, :, :) = permute(lqdfrft(permute(output(n, :, :), [2, 1, 3]), kernel, u), [2, 1, 3]);
end

for n = 1 : sCols
    output(:, n, :) = lqdfrft(output(:, n, :), kernel, u);
end

end