function output = lqdfrnt2(source, rr, rc, u)
%lqdfrnt2 - two-dimension LQDFRNT
%
% - Description:
%       the two-dimension left quaternion discrete fractional random transform
%
% - Arguments:
%       - source [mxnx4 double matrix] mxnx4 source signal matrix
%       - rr [nxn double matrix] a kernel matrix, it will be used when doing LQDFRNT to every row
%       - pc [mxm double matrix] a kernel matrix, it will be used when doing LQDFRNT to every col
%       - u [1x4 vector] a unit pure quaternion vector
%
% - Returns:
%       - output [mxnx4 double matrix] mxnx4 output signal matrix
%
% - Tips:
%       some u examples:
%       - [0 1 0 0]
%       - [0 0 1 0]
%       - [0 0 0 1]

% get size info
[sourceRows, sourceCols, ~] = size(source);

% init the output
output = source;

% do the LQDFRNT to every row
for n = 1 : sourceRows
    output(n, :, :) = lqdfrnt(output(n, :, :), rr, u);
end

% to the LQDFRNT to every col
for n = 1 : sourceCols
    t = lqdfrnt(permute(output(:, n, :), [2, 1, 3]), rc, u);
    output(:, n, :) = permute(t, [2, 1, 3]);
end

end