from io import open
from setuptools import setup
from niftools_sphinx_theme import __version__

setup(
    name='niftools_sphinx_theme',
    version=__version__,
    description='A sphinx theme created to support niftools documentation',
    long_description=open('README.rst', encoding='utf-8').read(),
    author='TagnumElite',
    author_email='tagnumelite@elitekast.com',
    url='https://github.com/TagnumElite/niftools_sphinx_theme',
    license='MIT',
    packages=['niftools_sphinx_theme'],
    install_requires=["sphinx"],
    include_package_data=True,
    package_data={
        'niftools_sphinx_theme': [
            'theme.conf',
            '*.html',
            'static/css/*.css',
            'static/js/*.js',
            'static/fonts/*.*'
        ]
    },
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Framework :: Sphinx',
        'Framework :: Sphinx :: Theme',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: Apache Software License',
        'Operating System :: OS Independent',
        'Topic :: Documentation',
        'Topic :: Software Development :: Documentation',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
    entry_points={
        'sphinx.html_themes': [
            'niftools_sphinx_theme = niftools_sphinx_theme',
        ]
    },
)
