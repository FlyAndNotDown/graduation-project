function mask = textureMask(source, l)
%textureMask - get texture mark value of a image block
%
% - Description:
%       get texture mark value of a image block
%
% - Arguments:
%       - source [nxnx3 matrix] source image block
%       - l [integer] window length
%
% - Returns:
%       - mask [double] texture mask value of target pixel

% get size info
[sourceRow, sourceCol, ~] = size(source);

% get window size
windowSize = (2 * l + 1) * (2 * l + 1);

% for every pixel, calculate its texture mask value
mask = 0;
for n1 = 1 : sourceRow
    for n2 = 1 : sourceCol
        % get near (2l + 1)^2 size pixels' pixel sum
        sumR = 0;
        sumG = 0;
        sumB = 0;
        for n3 = (n1 - l) : (n1 + l)
            for n4 = (n2 - l) : (n2 + l)
                % TODO
                if n3 >= 1 && n3 <= sourceRow && n4 >= 1 && n4 <= sourceCol
                    sumR = sumR + source(n3, n4, 1);
                    sumG = sumG + source(n3, n4, 2);
                    sumB = sumB + source(n3, n4, 3);
                else
                    sumR = sumR + source(n1, n2, 1);
                    sumG = sumG + source(n1, n2, 2);
                    sumB = sumB + source(n1, n2, 2);
                end
            end
        end

        % get average
        averageR = sumR / windowSize;
        averageG = sumG / windowSize;
        averageB = sumB / windowSize;

        % get texture mask value in three channel
        textureR = abs(source(n1, n2, 1) - averageR);
        textureG = abs(source(n1, n2, 2) - averageG);
        textureB = abs(source(n1, n2, 3) - averageB);

        % get mask and add it to result
        mask = mask + max([textureR, textureG, textureB]);
    end
end

end