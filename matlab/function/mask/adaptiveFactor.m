function factors = adaptiveFactor(blocks, l)
%adaptiveFactor - get adaptive factor of every blocks in image
%
% - Description:
%       get adaptive factor of every blocks in image
%
% - Arguments:
%       - blocks [1xn cell array {mxnx3 matrix}] smaller block splited from origin image matrix
%       - l [integer] window length, use when get texture mask value
%
% - Returns:
%       - factor [1xn double matrix] adaptive factor of every blocks

% get num of blocks
[~, blockNum] = size(blocks);

% generate some vector to save texture mask, temp adaptive factor and result
textureMasks = zeros(1, blockNum);
tempAdaptiveFactors = zeros(1, blockNum);
factors = zeros(1, blockNum);

% for every blocks, calculate its texture mask value
for n = 1 : blockNum
    textureMasks(1, n) = textureMask(blocks{1, n}, l);
end

% get max texture mask value
maxTextureMask = max(textureMasks);

% normalization
for n = 1 : blockNum
    textureMasks(1, n) = textureMasks(1, n) / maxTextureMask;
end

% get temp adaptive factor
for n = 1 : blockNum
    tempAdaptiveFactors(1, n) = textureMasks(1, n);
end

% get max and min adaptive factor
maxTempAdaptiveFactor = max(tempAdaptiveFactors);
minTempAdaptiveFactor = min(tempAdaptiveFactors);

% get result
for n = 1 : blockNum
    factors(1, n) = round(6 * (tempAdaptiveFactors(1, n) - minTempAdaptiveFactor) / (maxTempAdaptiveFactor - minTempAdaptiveFactor));
end

end