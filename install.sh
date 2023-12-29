#! /bin/bash
if [ "$EUID" -eq 0 ]; then
    echo "Please run this script as a regular user, not as root."
    exit 1
fi

# update system
sudo pacman -Syu --noconfirm

# install yay
if ! command -v yay &> /dev/null; then
    echo "yay is not installed, installing yay"
    git clone https://aur.archlinux.org/yay.git $HOME/.local/yay
    cd $HOME/.local/yay
    makepkg -si
    echo "yay installed"
fi

# checks if an NVIDIA GPU is present
nvidia_present=false
if lspci | grep -i nvidia &> /dev/null; then
    nvidia_present=true
fi

# install NVIDIA drivers if needed
if [ "$nvidia_present" = true ]; then
    # Check if the kernel is either linux or linux-lts
    if [ "$(uname -r | grep -E '^(linux|linux-lts)')" ]; then
        # Check if the GPU is Maxwell (NV110) series or newer
        if lspci | grep -E "VGA|3D" | grep -q -E "NVIDIA Corporation (GTX|RTX|Quadro) [23456789][0-9][0-9]"; then
            echo "NVIDIA GPU detected. Installing NVIDIA drivers."
            yay -S --noconfirm nvidia nvidia-dkms nvidia-settings nvidia-prime acpi_call optimus-manager optimus-manager-qt cuda
            echo "blacklist nouveau" | sudo tee /etc/modprobe.d/blacklist-nvidia-nouveau.conf
            sudo mkinitcpio -P
            sudo systemctl enable optimus-manager.service
            sudo systemctl start optimus-manager.service
            echo "NVIDIA drivers installation complete. check optimus repo for more info"
        else
            echo "NVIDIA GPU is not of Maxwell (NV110) series or newer. No action taken."
        fi
    else
        echo "Kernel is not linux or linux-lts. No action taken."
    fi
else
    echo "No NVIDIA GPU detected. No action taken."
fi


# GNOME
echo "installing GNOME."
yay -S --noconfirm xorg-server xorg-xinit
yay -S --noconfirm - < gnome-packages.txt

echo "enabling gnome related services."
sudo systemctl enable gdm.service
sydo systemctl enable NetworkManager.service

echo "enabling gnome extensions."
gnome-extensions enable - < gnome-extensions.txt

# PACKAGES
echo "install packages"
yay -S --noconfirm - < packages.txt
chsh -s $(which zsh)

#enabling services
echo "enabling services"
sudo systemctl enable bluetooth.service
sudo systemctl start bluetooth.service
sudo systemctl enable pipewire pipewire-pulse wireplumber

#installing configs
echo "installing configs"
cp .vscode $HOME/ -r
cp .zshrc $HOME/
cp .themes $HOME/ -r
cp .config/alacritty $HOME/.config -r 
cp .config/neofetch $HOME/.config -r
cp .config/sheldon $HOME/.config -r

echo "checkout gdm settings and gradience. you should run pywal -i <path to image> to generate color theme"
echo "if you still have issues with nvidia drivers, check out this repo https://github.com/korvahannu/arch-nvidia-drivers-installation-guide and follow the instructions arch wiki is also a good place to look for help"