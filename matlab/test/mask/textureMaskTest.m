% init source
source = zeros(3, 3, 3);
source(1, :, :) = [1, 2, 7; 2, 3, 11; 3, 6, 5];
source(2, :, :) = [2, 3, 4; 3, 4, 5; 4, 1, 6];
source(3, :, :) = [8, 6, 1; 4, 12, 6; 5, 9, 7];

% get grain mask
textureMaskValue = textureMask(source, 1);