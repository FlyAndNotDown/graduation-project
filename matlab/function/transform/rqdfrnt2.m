function output = rqdfrnt2(source, rr, rc, u)
%rqdfrnt2 - two-dimension RQDFRNT
%
% - Description:
%       the two-dimension right quaternion discrete fractional random transform
%
% - Arguments:
%       - source [mxnx4 double matrix] mxnx4 source signal matrix
%       - rr [nxn double matrix] a kernel matrix, it will be used when doing RQDFRNT to every row
%       - pc [mxm double matrix] a kernel matrix, it will be used when doing RQDFRNT to every col
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

% do the RQDFRNT to every row
for n = 1 : sourceRows
    output(n, :, :) = rqdfrnt(output(n, :, :), rr, u);
end

% to the RQDFRNT to every col
for n = 1 : sourceCols
    t = rqdfrnt(permute(output(:, n, :), [2, 1, 3]), rc, u);
    output(:, n, :) = permute(t, [2, 1, 3]);
end

end