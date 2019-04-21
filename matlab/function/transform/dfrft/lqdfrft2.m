function output = lqdfrft2(source, sLength, a, ur, uc)
%lqdfrft2 - two-dimension LQDFrFT
%
% - Arguments:
%       - source [nxnx4 double matrix] nxnx4 source quaternion signal matrix
%       - sLength [int] length of source matrix
%       - a [double] fractional order of transform
%       - ur [1x4 vector] a unit pure quaternion vector
%       - uc [1x4 vector] a unit pure quaternion vector

output = source;

for n = 1 : sLength
    output(n, :, :) = permute(lqdfrft(permute(output(n, :, :), [2, 1, 3]), a, ur), [2, 1, 3]);
end

for n = 1 : sLength
    output(:, n, :) = lqdfrft(output(:, n, :), a, uc);
end

end