% init source matrix
source = zeros(4, 1, 4);
source(:, :, 1) = [0, 0, 0, 0]';
source(:, :, 2) = [1, 2, 3, 4]';
source(:, :, 3) = [2, 3, 4, 5]';
source(:, :, 4) = [3, 4, 5, 6]';

% get a random matrix
p = rand(4, 4);

% set a pure unit quaternion
u = [0, 1, 0, 0];

% calculate kernel matrix of QDFRNT
kernel = dfrntKernel(0.25, 1, p);
iKernel = dfrntKernel(-0.25, 1, p);

% matrix after one time QDFRNT
output = lqdfrnt(source, kernel, u);

% matrix restored from output matrix
reSource = lqdfrnt(output, iKernel, u);

% matrix after four time QDFRNT
output4 = lqdfrnt(output, kernel, u);
output4 = lqdfrnt(output4, kernel, u);
output4 = lqdfrnt(output4, kernel, u);