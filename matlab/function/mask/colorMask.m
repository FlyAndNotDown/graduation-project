function mask = colorMask(source, s)
%colorMask - get color mask value of a image block
%
% - Arguments:
%       - source [nxnx3 matrix] source CIELab block
%       - s [double from 0 to 1] a factor has effect on calculate
%
% - Returns:
%       - mask [double] color mask value of target block

% get size info
[sourceRow, sourceCol, ~] = size(source);

% for every pixel, calculate its color mask value
mask = 0;
for n1 = 1 : sourceRow
    for n2 = 1 : sourceCol
        a = source(n1, n2, 2);
        b = source(n1, n2, 3);
        mask = mask + (1 - exp(-(a ^ 2 + b ^ 2) / (s ^ 2)));
    end
end

end