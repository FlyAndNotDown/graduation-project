function model = qdfrntTrain(source, secret, kt, intensity)
%qdfrntTrain - train svm model to restore secret watermark
%
% - Arguments:
%       - source [nxnx3 double matrix] matrix of colorful source image
%       - secret [1xm binary vector] vector of secret sequence
%       - kt [8x8 double matrix] kernel matrix of transform, can be generated by function 'qdfrntKernel'
%       - intensity [double] the intensity of watermarking
%
% - Returns:
%       - model [SVM model] train result model

% get size info
[sourceRow, ~, ~] = size(source);
[~, secretLength] == size(secret);

% split picture to 8x8 smaller blocks
blocks = splitBlock(source, 8);
[~, blocksLength] = size(blocks);
[blockRow, ~, ~] = size(blocks{1, 1});

% set a pure unit quaternion
u = [0, 1, 0, 0];

% get adaptive factors of every blocks
adaptiveFactors = adaptiveFactors(blocks, 1, 0.25);

% do QDFRNT to every blocks
encodedBlocks = cell(1, blocksLength);
for n = 1 : blocksLength
    t = zeros(blockRow, blockRow, 4);
    for n1 = 2 : 4
        t(:, :, n1) = blocks{1, n}(:, :, n1 - 1);
    end
    encodedBlocks{1, n} = lqdfrnt2(t, kt, kt, u);
end

% start watermarking
x = 1;
over = false;
for channel = 3 : 4
    % if over, break
    if over
        break;
    end

    for n = 1 : blocksLength
        % if secret sequence marked over, break
        if x > secretLength
            over = true;
            break;
        end

        % if adaptive factor is 0, not do watermarking
        if adaptiveFactors(1, n) > 0
            % get a channel of a block
            blockChannel = encodedBlocks{1, n}(:, :, channel);

            % get sequence
            blockChannelSequence = zeros(64, 3);
            for n1 = 1 : 8
                for n2 = 1 : 8
                    if blockChannel(n1, n2) >= 0
                        blockChannelSequence((n1 - 1) * 8 + n2, 1) = blockChannel(n1, n2);
                    else
                        blockChannelSequence((n1 - 1) * 8 + n2, 1) = 0 - blockChannel(n1, n2);
                    end
                    blockChannelSequence((n1 - 1) * 8 + n2, 2) = n1;
                    blockChannelSequence((n1 - 1) * 8 + n2, 3) = n2;
                end
            end

            % sorting by sequence value
            for n1 = 1 : 63
                minIndex = n1;
                for n2 = n1 + 1 : 64
                    if blockChannelSequence(n2, 1) < blockChannelSequence(minIndex, 1)
                        minIndex = n2;
                    end
                end
                t = blockChannelSequence(n1, :);
                blockChannelSequence(n1, :) = blockChannelSequence(minIndex, :);
                blockChannelSequence(minIndex, :) = t;
            end

            % get middle sequence value's position
            t = 32;
            row = blockChannelSequence(t, 2);
            col = blockChannelSequence(t, 3);
            count = 1;
            flag = true;
            while ~(row >= 2 && row <= 7 && col >= 2 && col <= 7)
                if flag
                    t = t + count;
                else
                    t = t - count;
                end
                count = count + 1;
                flag = ~flag;
                row = blockChannelSequence(t, 2);
                col = blockChannelSequence(t, 3);
            end

            % TODO
        end
    end
end

end