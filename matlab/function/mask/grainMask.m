function mask = textureMask(source)
%textureMask - get texture mark value of a pixel
%
% - Description:
%       get texture mark value of a pixel
%
% - Arguments:
%       - source [nxnx3 matrix] target(center) pixel and adjacent pixels' RBG matrix
%
% - Returns:
%       - mask [double] texture mask value of target pixel

% get size info
[sourceRow, sourceCol] = size(source);

% get center position
centerRow = fix(sourceRow / 2) + 1;
centerCol = fix(sourceCol / 2) + 1;

% get texture mask value of three channel
sumR = 0;
sumG = 0;
sumB = 0;
for n1 = 1 : sourceRow
    for n2 = 1 : sourceCol
        sumR = sumR + source(n1, n2, 1);
        sumG = sumG + source(n1, n2, 2);
        sumB = sumB + source(n1, n2, 3);
    end
end
averageR = sumR / (sourceRow * sourceCol);
averageG = sumG / (sourceRow * sourceCol);
averageB = sumB / (sourceRow * sourceCol);
textureR = abs(source(centerRow, centerCol, 1) - averageR);
textureG = abs(source(centerRow, centerCol, 2) - averageG);
textureB = abs(source(centerRow, centerCol, 3) - averageB);

% get max value of three channel
mask = max([textureR, textureG, textureB]);

end