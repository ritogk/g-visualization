FROM php:7.4-fpm
COPY php.ini /usr/local/etc/php/

# cargo install
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

#Composer install
RUN cd /usr/bin && curl -s http://getcomposer.org/installer | php && ln -s /usr/bin/composer.phar /usr/bin/composer

RUN apt-get update \
&& apt-get install -y \
git \
zip \
unzip \
vim
RUN apt-get update \
    && docker-php-ext-install pdo_mysql

RUN apt-get install -y zlib1g-dev libzip-dev libpng-dev wget\
    && docker-php-ext-install -j$(nproc) gd zip

RUN apt install -y nodejs npm \
    && npm install n -g \
    && n latest 
RUN pecl install xdebug && docker-php-ext-enable xdebug

ENV COMPOSER_ALLOW_SUPERUSER 1

ENV COMPOSER_HOME /composer

ENV PATH $PATH:/composer/vendor/bin


WORKDIR /var/www/html