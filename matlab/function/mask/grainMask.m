function mask = grainMask(source)
%grainMask - get grain mark of a pixel
%
% - Description:
%       get grain mark value of a pixel
%
% - Arguments:
%       - source [nxnx3 matrix] target(center) pixel and adjacent pixels' RBG matrix
%
% - Returns:
%       - mask [double] grain mask value of target pixel

% get size info
[sourceRow, sourceCol] = size(source);

% get center position
centerRow = fix(sourceRow / 2) + 1;
centerCol = fix(sourceCol / 2) + 1;

% get sum of all pixel


end