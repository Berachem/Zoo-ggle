from setuptools import setup, find_packages

setup(
    name='chatac',
    version='0.1',
    description='A simple chat server using websockets relying on aiohttp',
    author='Michel Chilowicz',
    author_email='chilowi@u-pem.fr',
    package_dir={'':'src'},
    packages=find_packages("src", exclude=[]),
    package_data={'chatac': ['templates/*.yml', 'resources/**']},
    entry_points={'console_scripts': ['chatac-server=chatac.server:main0'] },
    python_requires='>=3.6',
    install_requires=['aiohttp', 'PyYAML'],
    # test_suite='your.module.tests',
)
