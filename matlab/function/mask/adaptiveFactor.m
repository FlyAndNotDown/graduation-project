function factors = adaptiveFactor(blocks, l, s)
%adaptiveFactor - get adaptive factor of every blocks in image
%
% - Description:
%       get adaptive factor of every blocks in image
%
% - Arguments:
%       - blocks [1xn cell array {mxnx3 matrix}] smaller block splited from origin image matrix
%       - l [integer] window length, use when get texture mask value
%       - s [double from 0 to 1] a factor used when get color mask value
%
% - Returns:
%       - factor [1xn double matrix] adaptive factor of every blocks

% get num of blocks
[~, blockNum] = size(blocks);

% get size info of every block
[blockRow, blockCol, ~] = size(blocks{1, 1});

% change color space from RGB to CIELab
blocksLab = cell(1, blockNum);
for n = 1 : blockNum
    blocksLab{1, n} = rgb2lab(blocks{1, n});
end

% do normalization
channelAMax = blocksLab{1, n}(1, 1, 2);
channelBMax = blocksLab{1, n}(1, 1, 3);
for n = 1 : blockNum
    for n1 = 1 : blockRow
        for n2 = 1 : blockCol
            channelA = blocksLab{1, n}(n1, n2, 2);
            channelB = blocksLab{1, n}(n1, n2, 3);
            if channelA > channelAMax
                channelAMax = channelA;
            end
            if channelB > channelBMax
                channelBMax = channelB;
            end
        end
    end
end
for n = 1 : blockNum
    for n1 = 1 : blockRow
        for n2 = 1 : blockCol
            blocksLab{1, n}(n1, n2, 2) = blocksLab{1, n}(n1, n2, 2) / channelAMax;
            blocksLab{1, n}(n1, n2, 3) = blocksLab{1, n}(n1, n2, 3) / channelBMax;
        end
    end
end

% generate some vector to save texture mask, color mask, temp adaptive factor and result
textureMasks = zeros(1, blockNum);
colorMasks = zeros(1, blockNum);
edgeMasks = zeros(1, blockNum);
tempAdaptiveFactors = zeros(1, blockNum);
factors = zeros(1, blockNum);

% for every blocks, calculate its texture mask value and color mask value
for n = 1 : blockNum
    textureMasks(1, n) = textureMask(blocks{1, n}, l);
    colorMasks(1, n) = colorMask(blocksLab{1, n}, s);
    edgeMasks(1, n) = edgeMask(blocks{1, n});
end

% get max texture mask value and color mask
maxTextureMask = max(textureMasks);
maxColorMask = max(colorMasks);
maxEdgeMask = max(edgeMasks);

% normalization
for n = 1 : blockNum
    textureMasks(1, n) = textureMasks(1, n) / maxTextureMask;
    colorMasks(1, n) = colorMasks(1, n) / maxColorMask;
    edgeMasks(1, n) = edgeMasks(1, n) / maxEdgeMask;
end

% get temp adaptive factor
for n = 1 : blockNum
    tempAdaptiveFactors(1, n) = 0.2 * textureMasks(1, n) - 0.5 * edgeMasks(1, n) - 0.3 * colorMasks(1, n);
end

% get max and min adaptive factor
maxTempAdaptiveFactor = max(tempAdaptiveFactors);
minTempAdaptiveFactor = min(tempAdaptiveFactors);

% get result
for n = 1 : blockNum
    factors(1, n) = round(6 * (tempAdaptiveFactors(1, n) - minTempAdaptiveFactor) / (maxTempAdaptiveFactor - minTempAdaptiveFactor));
end

end