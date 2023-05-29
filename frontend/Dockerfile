FROM httpd:2.4
COPY ./build/ /usr/local/apache2/htdocs/
RUN sed -i "s|Listen 80|Listen 3000|g" /usr/local/apache2/conf/httpd.conf